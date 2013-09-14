package com.adaranet.jsonBeans;

import java.util.HashSet;
import java.util.Set;

import com.adaranet.dto.PortDto;

public class PortsJsonBean {

	private PortDto sourcePort;
	private Set<PortDto> connectedPorts = new HashSet<PortDto>();
	
	public void setSourcePort(PortDto sourcePort) {
		this.sourcePort = sourcePort;
	}
	
	public PortDto getSourcePort() {
		return sourcePort;
	}
	
	public void setConnectedPorts(Set<PortDto> connectedPorts) {
		this.connectedPorts = connectedPorts;
	}
	
	public Set<PortDto> getConnectedPorts() {
		return connectedPorts;
	}
	
}
