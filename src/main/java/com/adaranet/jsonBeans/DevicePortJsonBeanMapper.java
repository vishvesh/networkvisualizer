package com.adaranet.jsonBeans;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class DevicePortJsonBeanMapper {

	private List<DevicesJsonBean> devicesJsonBean;
	private List<PortsJsonBean> portsJsonBean;
	
	public void setDevicesJsonBean(List<DevicesJsonBean> devicesJsonBean) {
		this.devicesJsonBean = devicesJsonBean;
	}
	
	public List<DevicesJsonBean> getDevicesJsonBean() {
		return devicesJsonBean;
	}
	
	public void setPortsJsonBean(List<PortsJsonBean> portsJsonBean) {
		this.portsJsonBean = portsJsonBean;
	}
	
	public List<PortsJsonBean> getPortsJsonBean() {
		return portsJsonBean;
	}
	
}
