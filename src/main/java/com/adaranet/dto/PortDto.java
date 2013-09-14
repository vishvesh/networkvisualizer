package com.adaranet.dto;

import java.io.Serializable;

public class PortDto implements Serializable{
	
	/**
	 * @author vdeshmukh
	 */
	
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String portName;
    private String portType;
    
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
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public Long getId() {
		return id;
	}
}
