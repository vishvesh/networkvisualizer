package com.adaranet.jsonBeans;

import java.util.ArrayList;
import java.util.List;

import com.adaranet.dto.DeviceDto;

public class DevicesJsonBean {
	
	private DeviceDto parentDevice;
	private List<DeviceDto> connectedDevices = new ArrayList<DeviceDto>();
	
	public void setParentDevice(DeviceDto parentDevice) {
		this.parentDevice = parentDevice;
	}
	
	public DeviceDto getParentDevice() {
		return parentDevice;
	}
	
	public void setConnectedDevices(List<DeviceDto> connectedDevices) {
		this.connectedDevices = connectedDevices;
	}
	
	public List<DeviceDto> getConnectedDevices() {
		return connectedDevices;
	}
}
