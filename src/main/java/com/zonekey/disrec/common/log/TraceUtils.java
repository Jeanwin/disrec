package com.zonekey.disrec.common.log;

import org.apache.log4j.MDC;

import com.zonekey.disrec.common.utils.IdUtils;

/**
 * 系统运行时打印方便调试与追踪信息的工具类.
 * 
 * 使用MDC存储traceID, 一次trace中所有日志都自动带有该ID,
 * 可以方便的用grep命令在日志文件中提取该trace的所有日志.
 * 
 * 需要在log4j.properties中将ConversionPattern添加%X{traceId},如:
 * log4j.appender.stdout.layout.ConversionPattern=%d [%c] %X{traceId}-%m%n
 * 
 * @author calvin
 */
public abstract class TraceUtils {

	public static final String TRACE_ID_KEY = "traceId";

	/**
	 * 开始Trace, 默认生成本次Trace的ID(8字符长)并放入MDC.
	 */
	public static void beginTrace() {
		String traceId = IdUtils.uuid2();//.randomBase62();
		MDC.put(TRACE_ID_KEY, traceId);
	}

	/**
	 * 结束一次Trace, 清除traceId.
	 */
	public static void endTrace() {
		MDC.remove(TRACE_ID_KEY);
	}
}
