package com.zonekey.disrec.entity;

import java.util.Date;

public class Card {
    private String id;

    private String cardNumber;//卡号
    
    private String oldCardNumber;

    private String cardType;//0：普通卡 1：特殊卡

    private String cardPerson;

    private String createdate;

    private String createuser;

    private Date modifydate;

    private String modifyuser;

    private String deleteflag;//0:未删除 1：已删除

    private String cardState;//0：正常 1：已挂失

    private String cardPersonId;
    
    private String _loginname;
    
    private String lossDate;
    
    private String excelBatch;//导入的excel批次号
    
    private String flag;//导入的标识
    
    private String errorDescribe;//导入错误描述
    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber == null ? null : cardNumber.trim();
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType == null ? null : cardType.trim();
    }

    public String getCardPerson() {
        return cardPerson;
    }

    public void setCardPerson(String cardPerson) {
        this.cardPerson = cardPerson == null ? null : cardPerson.trim();
    }

    public String getCreateuser() {
        return createuser;
    }

    public void setCreateuser(String createuser) {
        this.createuser = createuser == null ? null : createuser.trim();
    }

    public Date getModifydate() {
        return modifydate;
    }

    public void setModifydate(Date modifydate) {
        this.modifydate = modifydate;
    }

    public String getModifyuser() {
        return modifyuser;
    }

    public void setModifyuser(String modifyuser) {
        this.modifyuser = modifyuser == null ? null : modifyuser.trim();
    }

    public String getDeleteflag() {
        return deleteflag;
    }

    public void setDeleteflag(String deleteflag) {
        this.deleteflag = deleteflag == null ? null : deleteflag.trim();
    }

    public String getCardState() {
        return cardState;
    }

    public void setCardState(String cardState) {
        this.cardState = cardState == null ? null : cardState.trim();
    }

    public String getCardPersonId() {
        return cardPersonId;
    }

    public void setCardPersonId(String cardPersonId) {
        this.cardPersonId = cardPersonId == null ? null : cardPersonId.trim();
    }

	public String get_loginname() {
		return _loginname;
	}

	public void set_loginname(String _loginname) {
		this._loginname = _loginname;
	}

	public String getExcelBatch() {
		return excelBatch;
	}

	public void setExcelBatch(String excelBatch) {
		this.excelBatch = excelBatch;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public String getErrorDescribe() {
		return errorDescribe;
	}

	public void setErrorDescribe(String errorDescribe) {
		this.errorDescribe = errorDescribe;
	}

	public String getOldCardNumber() {
		return oldCardNumber;
	}

	public void setOldCardNumber(String oldCardNumber) {
		this.oldCardNumber = oldCardNumber;
	}

	public String getLossDate() {
		return lossDate;
	}

	public void setLossDate(String lossDate) {
		this.lossDate = lossDate;
	}

	public String getCreatedate() {
		return createdate;
	}

	public void setCreatedate(String createdate) {
		this.createdate = createdate;
	}
}