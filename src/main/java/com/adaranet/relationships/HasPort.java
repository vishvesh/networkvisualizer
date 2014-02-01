package com.adaranet.relationships;

import org.springframework.data.neo4j.annotation.EndNode;
import org.springframework.data.neo4j.annotation.Fetch;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.Indexed;
import org.springframework.data.neo4j.annotation.RelationshipEntity;
import org.springframework.data.neo4j.annotation.StartNode;

import com.adaranet.model.Device;
import com.adaranet.model.Ports;
import com.adaranet.util.RelationshipTypes;

@RelationshipEntity(type = RelationshipTypes.HAS_PORT)
public class HasPort {
	@GraphId
	private Long id;
	
	@Fetch
	@StartNode
	private Device startDevice;
	
	@Fetch
	@EndNode
	@Indexed(unique = true)
	private Ports connectedPort;
	
	private String value;
	private String cost;
	
	public HasPort() {
		
	}
	
	public HasPort(Device startDevice, Ports connectedPort) {
		super();
		this.startDevice = startDevice;
		this.connectedPort = connectedPort;
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Device getStartDevice() {
		return startDevice;
	}
	public void setStartDevice(Device startDevice) {
		this.startDevice = startDevice;
	}
	public Ports getConnectedPort() {
		return connectedPort;
	}
	public void setConnectedPort(Ports connectedPort) {
		this.connectedPort = connectedPort;
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
