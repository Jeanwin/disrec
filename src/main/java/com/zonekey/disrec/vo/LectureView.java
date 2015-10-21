package com.zonekey.disrec.vo;

import java.util.List;

import com.zonekey.disrec.entity.Lecture;
import com.zonekey.disrec.entity.LectureChildren;


public class LectureView extends Lecture{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private List<LectureChildren> childList;
	public List<LectureChildren> getChildList() {
		return childList;
	}
	public void setChildList(List<LectureChildren> childList) {
		this.childList = childList;
	}

	
}
