package com.adaranet.jsonBeans;

import java.util.HashSet;
import java.util.Set;

import com.adaranet.dto.DeviceDto;

public class DevicesJsonBean {

	private DeviceDto parentDevice;
	private Set<DeviceDto> outgoingDevices = new HashSet<DeviceDto>();
	private Set<DeviceDto> incomingDevices = new HashSet<DeviceDto>();
	
	public void setIncomingDevices(Set<DeviceDto> incomingDevices) {
		this.incomingDevices = incomingDevices;
	}
	
	public Set<DeviceDto> getIncomingDevices() {
		return incomingDevices;
	}
	
	public Set<DeviceDto> getOutgoingDevices() {
		return outgoingDevices;
	}
	
	public void setOutgoingDevices(Set<DeviceDto> outgoingDevices) {
		this.outgoingDevices = outgoingDevices;
	}
	
	public void setParentDevice(DeviceDto parentDevice) {
		this.parentDevice = parentDevice;
	}
	
	public DeviceDto getParentDevice() {
		return parentDevice;
	}
	
}
