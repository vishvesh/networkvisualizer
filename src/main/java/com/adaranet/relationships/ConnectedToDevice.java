package com.adaranet.relationships;

import org.springframework.data.neo4j.annotation.EndNode;
import org.springframework.data.neo4j.annotation.Fetch;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.Indexed;
import org.springframework.data.neo4j.annotation.RelationshipEntity;
import org.springframework.data.neo4j.annotation.StartNode;

import com.adaranet.model.Device;
import com.adaranet.util.RelationshipTypes;

@RelationshipEntity(type = RelationshipTypes.CONNECTED_TO_DEVICE)
public class ConnectedToDevice {

	@GraphId
	private Long id;
	
	@Fetch
	@StartNode
	private Device sourceDevice;
	
	@Fetch
	@EndNode
	@Indexed(unique = true)
	private Device destinationDevice;
	
	@Indexed
	private String connectedPorts;
	
	private String linkCapacity;
	private String availableBandwidth;
	private String latency;
	
	public ConnectedToDevice() {
		
	}
	
	public ConnectedToDevice(Device sourceDevice, Device destinationDevice) {
		super();
		this.sourceDevice = sourceDevice;
		this.destinationDevice = destinationDevice;
	}
	
	public ConnectedToDevice(Device sourceDevice, Device destinationDevice, String connectedPorts, String linkCapacity, String availableBandwidth, String latency) {
		super();
		this.sourceDevice = sourceDevice;
		this.destinationDevice = destinationDevice;
		this.connectedPorts = connectedPorts;
		this.linkCapacity = linkCapacity;
		this.availableBandwidth = availableBandwidth;
		this.latency = latency;
	}
	
	public String getConnectedPorts() {
		return connectedPorts;
	}
	public void setConnectedPorts(String connectedPorts) {
		this.connectedPorts = connectedPorts;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Device getSourceDevice() {
		return sourceDevice;
	}
	public void setSourceDevice(Device sourceDevice) {
		this.sourceDevice = sourceDevice;
	}
	public Device getDestinationDevice() {
		return destinationDevice;
	}
	public void setDestinationDevice(Device destinationDevice) {
		this.destinationDevice = destinationDevice;
	}
	public String getLinkCapacity() {
		return linkCapacity;
	}
	public void setLinkCapacity(String linkCapacity) {
		this.linkCapacity = linkCapacity;
	}
	public String getAvailableBandwidth() {
		return availableBandwidth;
	}
	public void setAvailableBandwidth(String availableBandwidth) {
		this.availableBandwidth = availableBandwidth;
	}
	public String getLatency() {
		return latency;
	}
	public void setLatency(String latency) {
		this.latency = latency;
	}
	
	
}