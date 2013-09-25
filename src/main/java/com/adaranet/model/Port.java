package com.adaranet.model;

import java.util.HashSet;
import java.util.Set;

import org.neo4j.graphdb.Direction;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.Indexed;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.data.neo4j.annotation.RelatedToVia;
import org.springframework.data.neo4j.support.index.IndexType;

import com.adaranet.relationships.ConnectsToPort;
import com.adaranet.util.RelationshipTypes;
//import com.adaranet.relationships.ConnectsToDevice;

@NodeEntity
public class Port {

	/**
	 * @author vdeshmukh
	 */
	
    @GraphId
    private Long id;
    //@Indexed(unique = true)
    @Indexed(unique = true, indexType = IndexType.FULLTEXT, indexName = "searchByPortName")
    private String portName;
    private String portType;
    private String packetsIn;
    private String packetsOut;
    private String bitsIn;
    private String bitsOut;
    
    @RelatedToVia(type = RelationshipTypes.CONNECTS_TO_PORT, direction = Direction.OUTGOING, elementClass = ConnectsToPort.class)
    private Set<ConnectsToPort> connectedPorts = new HashSet<ConnectsToPort>();
    
    public void connectsToPort(Port destPort) {
    	ConnectsToPort connectsToPort = new ConnectsToPort(this, destPort);
    	this.connectedPorts.add(connectsToPort);
    	System.out.println("Connected Ports HashSet Size : "+connectedPorts.size());
    }
    
    public Set<Port> getAllConnectedPortsFromSourcePort() {
    	Set<Port> connectedPortsFromSourcePort = new HashSet<Port>();
    	for (ConnectsToPort connectedPort : connectedPorts) {
    		connectedPortsFromSourcePort.add(connectedPort.getDestPort());
		}
		return connectedPortsFromSourcePort;
	}
    
    public Port() {
    	
	}
    
    public Port(String portName, String portType) {
    	super();
    	this.portName = portName;
    	this.portType = portType;
    }
    
    public Port(String portName, String portType, String packetsIn, String packetsOut, String bitsIn, String bitsOut) {
		super();
		this.portName = portName;
		this.portType = portType;
		this.packetsIn = packetsIn;
		this.packetsOut = packetsOut;
		this.bitsIn = bitsIn;
		this.bitsOut = bitsOut;
	}

	public Long getId() {
		return id;
	}
    
    public String getPacketsIn() {
		return packetsIn;
	}
    
    public String getPacketsOut() {
		return packetsOut;
	}
    
    public void setPacketsIn(String packetsIn) {
		this.packetsIn = packetsIn;
	}
    
    public void setPacketsOut(String packetsOut) {
		this.packetsOut = packetsOut;
	}
    
    public void setBitsIn(String bitsIn) {
		this.bitsIn = bitsIn;
	}
    
    public void setBitsOut(String bitsOut) {
		this.bitsOut = bitsOut;
	}
    
    public String getBitsIn() {
		return bitsIn;
	}
    
    public String getBitsOut() {
		return bitsOut;
	} 
 
    public void setPortName(String portName) {
		this.portName = portName;
	}
    
    public String getPortName() {
		return portName;
	}
    
    public void setPortType(String portType) {
		this.portType = portType;
	}
    
    public String getPortType() {
		return portType;
	}
    
    public Set<ConnectsToPort> getConnectedPorts() {
		return connectedPorts;
	}
}
