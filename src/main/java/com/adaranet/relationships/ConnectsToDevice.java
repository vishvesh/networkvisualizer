/*package com.adaranet.relationships;

import org.springframework.data.neo4j.annotation.EndNode;
import org.springframework.data.neo4j.annotation.Fetch;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.Indexed;
import org.springframework.data.neo4j.annotation.RelationshipEntity;
import org.springframework.data.neo4j.annotation.StartNode;

import com.adaranet.model.Device;
import com.adaranet.model.Port;

@RelationshipEntity(type = "CONNECTS_TO_DEVICE")
public class ConnectsToDevice {
	
	@GraphId
	private Long id;
	
	@Fetch
	@StartNode
	@Indexed(unique = true)
	private Port sourcePort;
	
	@Fetch
	@EndNode
	private Device destinationDevice;
	
	private String value;
	private String cost;
	
	public ConnectsToDevice() {
		
	}
	
	public ConnectsToDevice(Port sourcePort, Device destinationDevice) {
		this.sourcePort = sourcePort;
		this.destinationDevice = destinationDevice;
	}
	
	public ConnectsToDevice(Port sourcePort, Device destinationDevice, String value, String cost) {
		this.sourcePort = sourcePort;
		this.destinationDevice = destinationDevice;
		this.value = value;
		this.cost = cost;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Port getSourcePort() {
		return sourcePort;
	}

	public void setSourcePort(Port sourcePort) {
		this.sourcePort = sourcePort;
	}

	public Device getDestinationDevice() {
		return destinationDevice;
	}

	public void setDestinationDevice(Device destinationDevice) {
		this.destinationDevice = destinationDevice;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getCost() {
		return cost;
	}

	public void setCost(String cost) {
		this.cost = cost;
	}
}
*/