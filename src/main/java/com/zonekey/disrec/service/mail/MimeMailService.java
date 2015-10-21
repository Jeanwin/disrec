package com.zonekey.disrec.service.mail;

import java.io.File;
import java.io.IOException;
import java.util.Map;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import com.google.common.collect.Maps;
import com.zonekey.disrec.common.utils.AssertUtils;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

/** 
 * <p>
 * MIME邮件服务类.
 * 由Freemarker引擎生成的的html格式邮件, 并带有附件.
 * </p>
 * @author <a href="mailto:wxcui@zbxsoft.com">Cancer</a>
 * @version v 0.1 
*/ 
public class MimeMailService {

	private static final String DEFAULT_ENCODING = "utf-8";

	private static Logger logger = LoggerFactory
			.getLogger(MimeMailService.class);

	private JavaMailSender mailSender;
	private Template mailTemplate;
	private String defaultFrom;

	/**
	 * Spring的MailSender.
	 */
	public void setMailSender(JavaMailSender mailSender) {
		this.mailSender = mailSender;
	}

	/**
	 * 注入Freemarker引擎配置,构造Freemarker 邮件内容模板.
	 */
	public void setFreemarkerConfiguration(Configuration freemarkerConfiguration)
			throws IOException {
		// 根据freemarkerConfiguration的templateLoaderPath载入文件.
		mailTemplate = freemarkerConfiguration.getTemplate("mailTemplate.ftl",
				DEFAULT_ENCODING);
	}

	public void setDefaultFrom(String defaultFrom) {
		this.defaultFrom = defaultFrom;
	}

	public Template getMailTemplate() {
		return mailTemplate;
	}

	public void setMailTemplate(Template mailTemplate) {
		this.mailTemplate = mailTemplate;
	}
	
	/**
	 * 发送MIME格式的邮件.
	 */
	public void sendNotificationMail(NoticeInfo noticeInfo) {
		
		AssertUtils.notNull(noticeInfo, "消息传输对象不能为空");
		
		try {
			MimeMessage msg = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(msg, true,
					DEFAULT_ENCODING);

			if(noticeInfo.getRecieverMail() != null) {
				if(StringUtils.contains(noticeInfo.getRecieverMail(), ",")) {
					helper.setTo(StringUtils.split(noticeInfo.getRecieverMail(), ","));
				} else {
					helper.setTo(noticeInfo.getRecieverMail());
				}
			}
			
			helper.setFrom(this.defaultFrom);//发送人
			helper.setSubject(noticeInfo.getNoticeTitle());//主题

			//生成邮件内容.
			String content = generateContent(noticeInfo.getReceiver(), 
					noticeInfo.getNoticeTitle(), noticeInfo.getNoticeContent());
			helper.setText(content, true);
			
			if(noticeInfo.getCcRecieverMail() != null) {// 抄送
				if(StringUtils.contains(noticeInfo.getCcRecieverMail(), ",")) {
					helper.setCc(StringUtils.split(noticeInfo.getCcRecieverMail(), ","));
				} else {
					helper.setCc(noticeInfo.getCcRecieverMail());
				}
			}
			
			if(noticeInfo.getBccRecieverMail() != null) {// 暗送
				if(StringUtils.contains(noticeInfo.getBccRecieverMail(), ",")) {
					helper.setCc(StringUtils.split(noticeInfo.getBccRecieverMail(), ","));
				} else {
					helper.setCc(noticeInfo.getBccRecieverMail());
				}
			}
			
			if(noticeInfo.getMailAttachmentPath() != null) {//附件
				File attachment = generateAttachment(noticeInfo.getMailAttachmentPath());
				helper.addAttachment("mailAttachment.txt", attachment);
			}
			
			mailSender.send(msg);
			logger.info("HTML版邮件已发送至{}", noticeInfo.getRecieverMail());
		} catch (MessagingException e) {
			logger.error("构造邮件失败", e);
		} catch (Exception e) {
			logger.error("发送邮件失败", e);
		}
	}
	
	/**
	 * 使用Freemarker生成html格式内容.
	 */
	@SuppressWarnings("unchecked")
	private String generateContent(String userName, String noticeTitle, String noticeContent) throws MessagingException {

		try {
//			Map context = Collections.singletonMap("userName", userName);
			Map context = Maps.newHashMap();
			context.put("userName", userName);
			context.put("noticeTitle", noticeTitle);
			context.put("noticeContent", noticeContent);
			return FreeMarkerTemplateUtils.processTemplateIntoString(mailTemplate,
					context);
		} catch (IOException e) {
			logger.error("生成邮件内容失败, FreeMarker模板不存在", e);
			throw new MessagingException("FreeMarker模板不存在", e);
		} catch (TemplateException e) {
			logger.error("生成邮件内容失败, FreeMarker处理失败", e);
			throw new MessagingException("FreeMarker处理失败", e);
		}
	}

	/**
	 * 获取classpath中的附件.
	 */
	@SuppressWarnings("unused")
	private File generateAttachment(final String attPath) throws MessagingException {
		try {
			Resource resource = new ClassPathResource(attPath);
			return resource.getFile();
		} catch (IOException e) {
			logger.error("构造邮件失败,附件文件不存在", e);
			throw new MessagingException("附件文件不存在", e);
		}
	}
}
