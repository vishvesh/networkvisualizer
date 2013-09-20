package com.adaranet.xml;

import java.util.ArrayList;
import java.util.List;

import com.adaranet.model.Device;

public class PortXmlMapper {

	private List<Device> deviceHasPorts = new ArrayList<Device>();
	
	public void setDeviceHasPorts(List<Device> deviceHasPorts) {
		this.deviceHasPorts = deviceHasPorts;
	}
	
	public List<Device> getDeviceHasPorts() {
		return deviceHasPorts;
	}
}
