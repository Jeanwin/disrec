package com.zonekey.disrec.vo;

import java.util.List;

import com.zonekey.disrec.entity.Range;
import com.zonekey.disrec.entity.RangeScope;

public class RangeView extends Range{
	private List<RangeScopeView> rangeScopes;
	private String rangeid;
	
	public String getRangeid() {
		return rangeid;
	}

	public void setRangeid(String rangeid) {
		this.rangeid = rangeid;
	}

	public List<RangeScopeView> getRangeScopes() {
		return rangeScopes;
	}

	public void setRangeScopes(List<RangeScopeView> rangeScopes) {
		this.rangeScopes = rangeScopes;
	}

	
	
}
