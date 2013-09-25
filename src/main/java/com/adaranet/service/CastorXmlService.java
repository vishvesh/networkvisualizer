package com.adaranet.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;

import com.adaranet.xml.DeviceXmlMapper;
import com.adaranet.xml.PortXmlMapper;
import com.adaranet.xml.xmlWrappers.ConnectionsWrapper;

public interface CastorXmlService {

	@Transactional
	public ResponseEntity<String> createDevicesFromXml(DeviceXmlMapper deviceXmlMapper);
	@Transactional
	public ResponseEntity<String> createPortsFromXml(PortXmlMapper portXmlMapper);
	@Transactional
	public ResponseEntity<String> connectDevicePortsFromXml(ConnectionsWrapper connectionsWrapper);
	@Transactional
	public ResponseEntity<String> updateDevicesFromXml(DeviceXmlMapper deviceXmlMapper);
	
}
