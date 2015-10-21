/*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.entity;

public class MaxClass {
	private Integer smaxclass;
	private Integer maxclass;

	public Integer getSmaxclass() {
		return smaxclass;
	}

	public void setSmaxclass(Integer smaxclass) {
		this.smaxclass = smaxclass;
	}

	public Integer getMaxclass() {
		return maxclass;
	}

	public void setMaxclass(Integer maxclass) {
		this.maxclass = maxclass;
	}

	@Override
	public String toString() {
		return "MaxClass [smaxclass=" + smaxclass + ", maxclass=" + maxclass
				+ "]";
	}

}
