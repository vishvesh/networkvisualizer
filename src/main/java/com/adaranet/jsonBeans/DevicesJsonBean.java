package com.adaranet.jsonBeans;

import java.util.HashSet;
import java.util.Set;

import com.adaranet.dto.DeviceDto;

public class DevicesJsonBean {
	
	private DeviceDto parentDevice;
	private Set<DeviceDto> connectedDevices = new HashSet<DeviceDto>();
	private Set<DeviceDto> hasVirtualMachines = new HashSet<DeviceDto>();
	
	public void setHasVirtualMachines(Set<DeviceDto> hasVirtualMachines) {
		this.hasVirtualMachines = hasVirtualMachines;
	}
	
	public Set<DeviceDto> getHasVirtualMachines() {
		return hasVirtualMachines;
	}
	
	public void setParentDevice(DeviceDto parentDevice) {
		this.parentDevice = parentDevice;
	}
	
	public DeviceDto getParentDevice() {
		return parentDevice;
	}
	
	public void setConnectedDevices(Set<DeviceDto> connectedDevices) {
		this.connectedDevices = connectedDevices;
	}
	
	public Set<DeviceDto> getConnectedDevices() {
		return connectedDevices;
	}
}
