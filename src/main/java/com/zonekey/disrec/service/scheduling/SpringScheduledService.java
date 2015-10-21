/**
 * 
 */
package com.zonekey.disrec.service.scheduling;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * @author yachang
 * 
 */
@Component
public class SpringScheduledService {
	
	/**
	 * 需要注意@Scheduled这个注解，它可配置多个属性：cron\fixedDelay\fixedRate
	 */
	@Scheduled(cron = "0,10,20,30,40,50 * * * * ?")
	public void executeBySpringCronByJava() {
		System.out.println("0.0");
	}
	
	/**
	 * 被Spring的Scheduler namespace 反射构造成ScheduledMethodRunnable
	 */
	public void executeBySpringCronByXml() {
		System.out.println("spring cron job by xml");
	}

	/**
	 * 被Spring的Scheduler namespace 反射构造成ScheduledMethodRunnable
	 */
	public void executeBySpringTimerByXml() throws Exception {
		/*try {
			if(1 == 1) {
				throw new Exception("test");
			}
			System.out.println("spring timer job by xml");
		} catch (Exception e) {
			e.printStackTrace();
		}*/
		System.out.println("spring timer job by xml");
	}
	
	/**
	 * 被Spring的Quartz MethodInvokingJobDetailFactoryBean反射执行
	 */
	public void executeByQuartzLocalJob() {
		System.out.println("Quartz local job @+@");
	}
}
