package com.adaranet.service.generic;

import org.springframework.data.neo4j.conversion.EndResult;
import org.springframework.transaction.annotation.Transactional;

public interface GenericService<T> {
	
	@Transactional
	public T saveEntity(T entity);
	
	@Transactional
	public void deleteEntity(T entity);
	
	@Transactional
	public EndResult<T> findAll();
	
	@Transactional
	public void deleteAll();
}
