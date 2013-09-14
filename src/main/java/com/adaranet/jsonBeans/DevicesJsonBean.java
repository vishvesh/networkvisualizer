package com.adaranet.jsonBeans;

import java.util.HashSet;
import java.util.Set;

import com.adaranet.dto.DeviceDto;
import com.adaranet.dto.PortDto;

public class DevicesJsonBean {
	
	private DeviceDto parentDevice;
	private Set<PortDto> hasPorts = new HashSet<PortDto>();
	
	public void setParentDevice(DeviceDto parentDevice) {
		this.parentDevice = parentDevice;
	}
	
	public DeviceDto getParentDevice() {
		return parentDevice;
	}
	
	public void setHasPorts(Set<PortDto> hasPorts) {
		this.hasPorts = hasPorts;
	}
	
	public Set<PortDto> getHasPorts() {
		return hasPorts;
	}
	
	/*
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
	*/
	
}
