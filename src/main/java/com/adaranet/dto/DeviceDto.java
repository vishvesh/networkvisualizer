package com.adaranet.dto;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class DeviceDto implements Serializable {

    /**
	 * @author vdeshmukh
	 */
	
	private static final long serialVersionUID = 1L;

	private Long id;
    private String deviceName;
    private String deviceType;
    private String value;
	private String cost;
	private Long portId;
	private String latency;
	private String linkCapacity;
	private String connectedPorts;
	private String availableBandwidth;
	private String originalPortNames;
	private String cpuUtilization;
    private String numberOfSessions;
    
    public void setCpuUtilization(String cpuUtilization) {
		this.cpuUtilization = cpuUtilization;
	}
    
    public String getCpuUtilization() {
		return cpuUtilization;
	}
    
    public void setNumberOfSessions(String numberOfSessions) {
		this.numberOfSessions = numberOfSessions;
	}
    
    public String getNumberOfSessions() {
		return numberOfSessions;
	}
	
	public void setOriginalPortNames(String originalPortNames) {
		this.originalPortNames = originalPortNames;
	}
	
	public String getOriginalPortNames() {
		return originalPortNames;
	}
	
	public void setPortId(Long portId) {
		this.portId = portId;
	}
	
	public Long getPortId() {
		return portId;
	}
	
	public String getConnectedPorts() {
		return connectedPorts;
	}

	public void setConnectedPorts(String connectedPorts) {
		this.connectedPorts = connectedPorts;
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

	public void setValue(String value) {
		this.value = value;
	}
	
	public String getValue() {
		return value;
	}
	
	public void setCost(String cost) {
		this.cost = cost;
	}
	
	public String getCost() {
		return cost;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDeviceName() {
		return deviceName;
	}

	public void setDeviceName(String deviceName) {
		this.deviceName = deviceName;
	}

	public String getDeviceType() {
		return deviceType;
	}

	public void setDeviceType(String deviceType) {
		this.deviceType = deviceType;
	}
}
