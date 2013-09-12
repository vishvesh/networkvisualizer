package com.adaranet.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.adaranet.model.Device;
import com.adaranet.model.Port;
import com.adaranet.service.generic.GenericService;

@Service
@Transactional
public interface PortService extends GenericService<Port> {
	public Port findPortByPortName(String portName);
}
