package com.adaranet.repository;

import com.adaranet.model.Port;
import com.adaranet.repository.generic.GenericRepository;

public interface PortRepository extends GenericRepository<Port> {
	public Port findPortByPortName(String portName);
}
