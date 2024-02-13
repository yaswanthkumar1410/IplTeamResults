package com.yaswanth.IplTeamResults.controller;


import com.yaswanth.IplTeamResults.Entity.Match;
import com.yaswanth.IplTeamResults.Entity.Team;
import com.yaswanth.IplTeamResults.repository.MatchRepository;
import com.yaswanth.IplTeamResults.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@RestController
@CrossOrigin
public class TeamController {
    MatchRepository matchRepository;
    TeamRepository teamRepository;
    @Autowired
    public TeamController(TeamRepository teamRepository, MatchRepository matchRepository){
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }

    @GetMapping("/teams")
    public Iterable<Team> getAllTeams(){
        return teamRepository.findAll();
    }

    @GetMapping("/teams/{teamName}")
    public Team getTeamData(@PathVariable String teamName) {
        Team team = teamRepository.findByTeamName(teamName);
        team.setMatches(matchRepository.findLatestMatchesbyTeam(teamName, 4));
        return team;
    }

    @GetMapping("/teams/{teamName}/matches")
    public List<Match> getMatches(@PathVariable String teamName, @RequestParam int year) {
        LocalDate startDate = LocalDate.of(year, 1, 1);
        LocalDate endDate = LocalDate.of(year,12,31);
        return matchRepository.getmatch(teamName, startDate, endDate);
    }

 }

