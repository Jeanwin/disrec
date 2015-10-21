package com.zonekey.disrec.common.utils;

import java.lang.reflect.Method;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

/**
 *  List����ָ���ֶ����򹤾���
 *
 * @param <T>
 */

public class ListSortUtil<T> {
	/**
	 * @param targetList Ŀ������List
	 * @param sortField �����ֶ�(ʵ����������)
	 * @param sortMode ����ʽ��asc or  desc��
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void sort(List<T> targetList, final String sortField, final String sortMode) {
	
		Collections.sort(targetList, new Comparator() {
			public int compare(Object obj1, Object obj2) { 
				int retVal = 0;
				try {
					//����ĸת��д
					String newStr=sortField.substring(0, 1).toUpperCase()+sortField.replaceFirst("\\w",""); 
					String methodStr="get"+newStr;
					
					Method method1 = ((T)obj1).getClass().getMethod(methodStr, null);
					Method method2 = ((T)obj2).getClass().getMethod(methodStr, null);
					if (sortMode != null && "desc".equals(sortMode)) {
						retVal = method2.invoke(((T) obj2), null).toString().compareTo(method1.invoke(((T) obj1), null).toString()); // ����
					} else {
						retVal = method1.invoke(((T) obj1), null).toString().compareTo(method2.invoke(((T) obj2), null).toString()); // ����
					}
				} catch (Exception e) {
					throw new RuntimeException();
				}
				return retVal;
			}
		});
	}
	
}
