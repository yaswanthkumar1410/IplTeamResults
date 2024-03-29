package com.yaswanth.IplTeamResults.repository;


import com.yaswanth.IplTeamResults.Entity.Team;
import org.springframework.data.repository.CrudRepository;

public interface TeamRepository extends CrudRepository<Team, Long> {
    Team findByTeamName(String teamName);
}
