package com.zonekey.disrec.common.exportexcel;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;

/**
 * Excel导出工具类
 * @author yu.w 
 * @date   2013-9-26
 */
public class ExportXLSUtil 
{
	private static final Logger log=Logger.getLogger(ExportXLSUtil.class);
	private static final DateFormat dateFormat=new SimpleDateFormat("yyyy-mm-dd");
	private static final int MAX_SHEET_ROW_SIZE=50000;//每个sheet中最大数据行数
			
	/**
    * @param title Sheet标题名
    * @param headers 表格属性列名数组
    * @param dataset 需要显示的数据集合,属性的数据类型有基本数据类型及String,Date,byte[](图片数据)
    * @param amounts 是否为金额
    */
	public static HSSFWorkbook exportExcel(String title, String[] headers, List<Object[]> dataset, Boolean[] amounts) 
	{
		if(headers==null || headers.length==0)
		{
			return null;
		}
		HSSFWorkbook workbook=new HSSFWorkbook();// 声明一个工作薄
		HSSFCellStyle headStyle=getHeadStyle(workbook);// 生成表格头样式
		if(dataset==null || dataset.isEmpty())
		{
			HSSFSheet sheet=workbook.createSheet(title);
			// 设置表格默认列宽度为25个字符
			sheet.setDefaultColumnWidth(25);
			//冻结表格头
			sheet.createFreezePane(0,1,0,1);
			//填充表格头
			fillHead(sheet,headers,headStyle);
			return workbook;
		}
		HSSFCellStyle dataStyle=getDataStyle(workbook);// 生成单元格数据样式
		HSSFCellStyle moneyStyle=getMoneyStyle(workbook);// 生成金额单元格数据样式
		int rows=dataset.size();
		int sheetNum=rows%MAX_SHEET_ROW_SIZE==0 ? rows/MAX_SHEET_ROW_SIZE : rows/MAX_SHEET_ROW_SIZE+1;
		int fIndex=0;
		int lIndex=0;
		String temTitle=title;
		for(int i=0;i<sheetNum;i++)
		{
			fIndex=i*MAX_SHEET_ROW_SIZE;
			lIndex=i<sheetNum-1 ? fIndex+MAX_SHEET_ROW_SIZE : rows;
			// 生成一个表格
			title=i==0 ? temTitle : temTitle+"("+(i+1)+")";
			HSSFSheet sheet=workbook.createSheet(title);
			// 设置表格默认列宽度为25个字符
			sheet.setDefaultColumnWidth(25);
			//冻结表格头
			sheet.createFreezePane(0,1,0,1);
			//填充表格头
			fillHead(sheet,headers,headStyle);
			//填充表格数据
			fillData(sheet,dataset,fIndex,lIndex,amounts,dataStyle,moneyStyle);
		}
		return workbook;
	}
	/**
	 * 填充表格数据
	 * @param sheet
	 * @param headers
	 * @param headStyle
	 */
	private static void fillHead(HSSFSheet sheet,String[] headers,HSSFCellStyle headStyle)
	{
		// 产生表格标题行
		HSSFRow row=sheet.createRow(0);
		for(int i=0;i<headers.length;i++)
		{
			HSSFCell cell=row.createCell(i);
			cell.setCellStyle(headStyle);
			cell.setCellValue(headers[i]);
		}
	}
	/**
	 * 填充表格数据
	 * @param workbook
	 * @param sheet
	 * @param headers
	 * @param dataset
	 * @param fIndex
	 * @param lIndex
	 * @param amounts
	 * @param headStyle
	 * @param dataStyle
	 * @param moneyStyle
	 */
	private static void fillData(HSSFSheet sheet,List<Object[]> dataset,int fIndex,int lIndex,Boolean[] amounts,HSSFCellStyle dataStyle,HSSFCellStyle moneyStyle)
	{
		HSSFRow row=null;
		int rowNum=0;
		for(int i=fIndex;i<lIndex;i++)
		{		
			row=sheet.createRow(++rowNum);
			row.setHeight((short)400);
			Object[] fields=dataset.get(i);
			for(int colNum=0;colNum<fields.length;colNum++)
			{
				HSSFCell cell=row.createCell(colNum);
				cell.setCellStyle(dataStyle);
				Object value=fields[colNum];
				if(value!=null)
				{
					try
					{
						// 判断值的类型后进行强制类型转换
						if(value instanceof Date){  //处理日期类型的数据
							Date date=(Date) value;
							String textValue=dateFormat.format(date);
							cell.setCellValue(textValue);
						}
						else if(value instanceof Number ){  //处理数字类型的数据
							String textValue=value.toString();
							if(textValue.length()>11){
								// 长度超过11位，按文本方式写入，防止出现科学计数法的现象。
								cell.setCellValue(textValue);
							}else{
								// 如果设置此列为货币金额格式，则格式化此列
								if(amounts[colNum]){
									cell.setCellStyle(moneyStyle);
								}
								// 是数字当作double处理
								cell.setCellValue(Double.parseDouble(textValue));
							}
						}else{
							// 其它数据类型都当作字符串简单处理
							cell.setCellValue(value.toString());
						}
					}
					catch(Exception e)
					{
						log.error("exportXLS error.",e);
					}
				}
			}
		}
	}
	/**
	 * 表格头样式
	 * @param workbook
	 * @return
	 */
	private static HSSFCellStyle getHeadStyle(HSSFWorkbook workbook)
	{
		HSSFCellStyle style=workbook.createCellStyle();
		// 设置这些样式
		style.setFillForegroundColor(HSSFColor.GREY_25_PERCENT.index);
		style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
		style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		style.setBorderRight(HSSFCellStyle.BORDER_THIN);
		style.setBorderTop(HSSFCellStyle.BORDER_THIN);
		//表格头居中、居右--niuxl修改
		style.setAlignment(HSSFCellStyle.ALIGN_RIGHT);
		style.setLocked(true);
		//生成一个字体
		HSSFFont font=workbook.createFont();
		font.setColor(HSSFColor.BLACK.index);
		font.setFontHeightInPoints((short) 10);
		font.setBoldweight(HSSFFont.BOLDWEIGHT_NORMAL);
		//把字体应用到当前的样式
		style.setFont(font);
		return style;
	}
	/**
	 * 单元格数据样式
	 * @param workbook
	 * @return
	 */
	private static HSSFCellStyle getDataStyle(HSSFWorkbook workbook)
	{
		HSSFCellStyle style=workbook.createCellStyle();
		//单元格居中、右--niuxl修改
		style.setAlignment(HSSFCellStyle.ALIGN_RIGHT);
		// 生成另一个字体
		HSSFFont font=workbook.createFont();
		font.setColor(HSSFColor.GREY_80_PERCENT.index);
		font.setBoldweight(HSSFFont.BOLDWEIGHT_NORMAL);
		//把字体应用到当前的样式
		style.setFont(font);
		return style;
	}
	/**
	 * 特殊处理金额单元格数据
	 * @param workbook
	 * @return
	 */
	private static HSSFCellStyle getMoneyStyle(HSSFWorkbook workbook)
	{
		HSSFCellStyle style=workbook.createCellStyle();
		// 设置数据格式样式
		HSSFDataFormat df=workbook.createDataFormat();
		style.setDataFormat(df.getFormat("###,##0.00"));
		return style;
	}
}