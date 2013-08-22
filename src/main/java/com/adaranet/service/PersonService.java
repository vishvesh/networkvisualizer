package com.adaranet.service;

import com.adaranet.model.Person;
import org.springframework.data.neo4j.repository.GraphRepository;

public interface PersonService extends GraphRepository<Person> {

    
}
