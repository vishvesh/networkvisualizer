package com.adaranet.xml;

import java.util.ArrayList;
import java.util.List;

import com.adaranet.model.Device;

public class DeviceXmlMapper {

	private List<Device> devices = new ArrayList<Device>();
	
	public void setDevices(List<Device> devices) {
		this.devices = devices;
	}
	
	public List<Device> getDevices() {
		return devices;
	}
	
}
