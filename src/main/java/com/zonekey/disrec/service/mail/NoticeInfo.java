/*****************************
 * Copyright (c) 2011 by ZbxSoft Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.service.mail;

/**
 * 消息传输对象
 * 
 */
public class NoticeInfo implements java.io.Serializable {

	private String noticeNo;
	private String noticeType;
	private String noticeTitle;
	private String noticeContent;
	private String isTimingSend;
	private String sendTime;
	private String sender;
	private String receiver;
	private String isUrgent;
	private String reponseStatus;
	private String reponseDesc;
	private String status;
	private String regKey;

	private String mailTemplatePath;
	private String mailAttachmentPath;
	private String recieverMail;
	private String ccRecieverMail;
	private String bccRecieverMail;

	public String getNoticeNo() {
		return noticeNo;
	}

	public void setNoticeNo(String noticeNo) {
		this.noticeNo = noticeNo;
	}

	public String getNoticeType() {
		return noticeType;
	}

	public void setNoticeType(String noticeType) {
		this.noticeType = noticeType;
	}

	public String getNoticeTitle() {
		return noticeTitle;
	}

	public void setNoticeTitle(String noticeTitle) {
		this.noticeTitle = noticeTitle;
	}

	public String getNoticeContent() {
		return noticeContent;
	}

	public void setNoticeContent(String noticeContent) {
		this.noticeContent = noticeContent;
	}

	public String getIsTimingSend() {
		return isTimingSend;
	}

	public void setIsTimingSend(String isTimingSend) {
		this.isTimingSend = isTimingSend;
	}

	public String getSendTime() {
		return sendTime;
	}

	public void setSendTime(String sendTime) {
		this.sendTime = sendTime;
	}

	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	public String getReceiver() {
		return receiver;
	}

	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}

	public String getIsUrgent() {
		return isUrgent;
	}

	public void setIsUrgent(String isUrgent) {
		this.isUrgent = isUrgent;
	}

	public String getReponseStatus() {
		return reponseStatus;
	}

	public void setReponseStatus(String reponseStatus) {
		this.reponseStatus = reponseStatus;
	}

	public String getReponseDesc() {
		return reponseDesc;
	}

	public void setReponseDesc(String reponseDesc) {
		this.reponseDesc = reponseDesc;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getRegKey() {
		return regKey;
	}

	public void setRegKey(String regKey) {
		this.regKey = regKey;
	}

	public String getMailTemplatePath() {
		return mailTemplatePath;
	}

	public void setMailTemplatePath(String mailTemplatePath) {
		this.mailTemplatePath = mailTemplatePath;
	}

	public String getMailAttachmentPath() {
		return mailAttachmentPath;
	}

	public void setMailAttachmentPath(String mailAttachmentPath) {
		this.mailAttachmentPath = mailAttachmentPath;
	}

	public String getRecieverMail() {
		return recieverMail;
	}

	public void setRecieverMail(String recieverMail) {
		this.recieverMail = recieverMail;
	}

	public String getCcRecieverMail() {
		return ccRecieverMail;
	}

	public void setCcRecieverMail(String ccRecieverMail) {
		this.ccRecieverMail = ccRecieverMail;
	}

	public String getBccRecieverMail() {
		return bccRecieverMail;
	}

	public void setBccRecieverMail(String bccRecieverMail) {
		this.bccRecieverMail = bccRecieverMail;
	}

}
