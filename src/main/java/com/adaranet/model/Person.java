package com.adaranet.model;

import java.util.Set;

import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.Indexed;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.data.neo4j.annotation.RelatedTo;
import org.springframework.data.neo4j.support.index.IndexType;

@NodeEntity
public class Person {

    @GraphId
    private Long id;

    @Indexed(indexType = IndexType.FULLTEXT, indexName = "searchByFirstName")
    private String firstName;

    private String lastName;

    @RelatedTo(type = "CONNECTS_TO")
    private Set<Person> connectedPersons;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    public void setConnectedPersons(Set<Person> connectedPersons) {
		this.connectedPersons = connectedPersons;
	}
    
    public Set<Person> getConnectedPersons() {
		return connectedPersons;
	}

}
