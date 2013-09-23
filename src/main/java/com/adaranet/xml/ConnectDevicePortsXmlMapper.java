package com.adaranet.xml;

import java.util.HashSet;
import java.util.Set;

import com.adaranet.model.Device;

public class ConnectDevicePortsXmlMapper {

	private Set<Device> connections = new HashSet<Device>();
	
	public void setConnections(Set<Device> connections) {
		this.connections = connections;
	}
	
	public Set<Device> getConnections() {
		return connections;
	}
}
