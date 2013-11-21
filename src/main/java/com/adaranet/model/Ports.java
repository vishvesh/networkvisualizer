package com.adaranet.model;

import java.io.Serializable;

import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.Indexed;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.data.neo4j.support.index.IndexType;

@NodeEntity
public class Ports implements Serializable {

	/**
	 * @author vdeshmukh
	 */
	
	private static final long serialVersionUID = 1L;
	
	@GraphId
    private Long id;
	@Indexed(unique = true, indexType = IndexType.FULLTEXT, indexName = "searchByPortName")
    private String portName;
    private String portType;
    private String packetsIn;
    private String packetsOut;
    private String bitsIn;
    private String bitsOut;
    
    public Ports(String portName) {
    	this.portName = portName;
	}
    
    public Ports() {
    	
	}
    
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getPortName() {
		return portName;
	}
	public void setPortName(String portName) {
		this.portName = portName;
	}
	public String getPortType() {
		return portType;
	}
	public void setPortType(String portType) {
		this.portType = portType;
	}
	public String getPacketsIn() {
		return packetsIn;
	}
	public void setPacketsIn(String packetsIn) {
		this.packetsIn = packetsIn;
	}
	public String getPacketsOut() {
		return packetsOut;
	}
	public void setPacketsOut(String packetsOut) {
		this.packetsOut = packetsOut;
	}
	public String getBitsIn() {
		return bitsIn;
	}
	public void setBitsIn(String bitsIn) {
		this.bitsIn = bitsIn;
	}
	public String getBitsOut() {
		return bitsOut;
	}
	public void setBitsOut(String bitsOut) {
		this.bitsOut = bitsOut;
	}
    
    
}
