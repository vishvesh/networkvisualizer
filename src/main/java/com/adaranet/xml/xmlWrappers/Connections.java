package com.adaranet.xml.xmlWrappers;

import com.adaranet.model.Device;

public class Connections {

	private Device sourceDevice;
	private Device destinationDevice;
	
	public void setSourceDevice(Device sourceDevice) {
		this.sourceDevice = sourceDevice;
	}
	
	public void setDestinationDevice(Device destinationDevice) {
		this.destinationDevice = destinationDevice;
	}
	
	public Device getSourceDevice() {
		return sourceDevice;
	}
	
	public Device getDestinationDevice() {
		return destinationDevice;
	}
	
}
