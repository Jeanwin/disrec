package com.zonekey.disrec.vo;

import java.util.List;

import com.zonekey.disrec.entity.Lecture;
import com.zonekey.disrec.entity.LectureChildren;
import com.zonekey.disrec.entity.Review;
import com.zonekey.disrec.entity.ReviewChildren;


public class ReviewView extends Review{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private List<ReviewChildren> childList;
	public List<ReviewChildren> getChildList() {
		return childList;
	}
	public void setChildList(List<ReviewChildren> childList) {
		this.childList = childList;
	}

	
}
