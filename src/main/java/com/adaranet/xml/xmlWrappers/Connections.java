package com.adaranet.xml.xmlWrappers;

import com.adaranet.model.Device;
import com.adaranet.relationships.ConnectsToPort;

public class Connections {

	private Device sourceDevice;
	private Device destinationDevice;
	private ConnectsToPort connectionProperties;
	
	public void setConnectionProperties(ConnectsToPort connectionProperties) {
		this.connectionProperties = connectionProperties;
	}
	
	public ConnectsToPort getConnectionProperties() {
		return connectionProperties;
	}
	
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
