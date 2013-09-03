package com.adaranet.repository.generic;

import org.springframework.data.neo4j.repository.GraphRepository;
import org.springframework.data.neo4j.repository.NamedIndexRepository;

public interface GenericRepository<T> extends GraphRepository<T>, NamedIndexRepository<T> {

}
