package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Congee;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Congee entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CongeeRepository extends JpaRepository<Congee, Long> {

}
