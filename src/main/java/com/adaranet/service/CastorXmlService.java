package com.adaranet.service;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;

import com.adaranet.xml.ConnectDevicePortsXmlMapper;
import com.adaranet.xml.DeviceXmlMapper;
import com.adaranet.xml.PortXmlMapper;

public interface CastorXmlService {

	@Transactional
	public ResponseEntity<String> createDevicesFromXml(DeviceXmlMapper deviceXmlMapper);
	@Transactional
	public ResponseEntity<String> createPortsFromXml(PortXmlMapper portXmlMapper);
	@Transactional
	public ResponseEntity<String> connectDevicePortsFromXml(ConnectDevicePortsXmlMapper connectDevicePortsXmlMapper);
	
}
