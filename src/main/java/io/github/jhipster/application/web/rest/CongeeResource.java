package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Congee;

import io.github.jhipster.application.repository.CongeeRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.service.dto.CongeeDTO;
import io.github.jhipster.application.service.mapper.CongeeMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Congee.
 */
@RestController
@RequestMapping("/api")
public class CongeeResource {

    private final Logger log = LoggerFactory.getLogger(CongeeResource.class);

    private static final String ENTITY_NAME = "congee";

    private final CongeeRepository congeeRepository;

    private final CongeeMapper congeeMapper;

    public CongeeResource(CongeeRepository congeeRepository, CongeeMapper congeeMapper) {
        this.congeeRepository = congeeRepository;
        this.congeeMapper = congeeMapper;
    }

    /**
     * POST  /congees : Create a new congee.
     *
     * @param congeeDTO the congeeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new congeeDTO, or with status 400 (Bad Request) if the congee has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/congees")
    @Timed
    public ResponseEntity<CongeeDTO> createCongee(@RequestBody CongeeDTO congeeDTO) throws URISyntaxException {
        log.debug("REST request to save Congee : {}", congeeDTO);
        if (congeeDTO.getId() != null) {
            throw new BadRequestAlertException("A new congee cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Congee congee = congeeMapper.toEntity(congeeDTO);
        congee = congeeRepository.save(congee);
        CongeeDTO result = congeeMapper.toDto(congee);
        return ResponseEntity.created(new URI("/api/congees/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /congees : Updates an existing congee.
     *
     * @param congeeDTO the congeeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated congeeDTO,
     * or with status 400 (Bad Request) if the congeeDTO is not valid,
     * or with status 500 (Internal Server Error) if the congeeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/congees")
    @Timed
    public ResponseEntity<CongeeDTO> updateCongee(@RequestBody CongeeDTO congeeDTO) throws URISyntaxException {
        log.debug("REST request to update Congee : {}", congeeDTO);
        if (congeeDTO.getId() == null) {
            return createCongee(congeeDTO);
        }
        Congee congee = congeeMapper.toEntity(congeeDTO);
        congee = congeeRepository.save(congee);
        CongeeDTO result = congeeMapper.toDto(congee);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, congeeDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /congees : get all the congees.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of congees in body
     */
    @GetMapping("/congees")
    @Timed
    public List<CongeeDTO> getAllCongees() {
        log.debug("REST request to get all Congees");
        List<Congee> congees = congeeRepository.findAll();
        return congeeMapper.toDto(congees);
        }

    /**
     * GET  /congees/:id : get the "id" congee.
     *
     * @param id the id of the congeeDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the congeeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/congees/{id}")
    @Timed
    public ResponseEntity<CongeeDTO> getCongee(@PathVariable Long id) {
        log.debug("REST request to get Congee : {}", id);
        Congee congee = congeeRepository.findOne(id);
        CongeeDTO congeeDTO = congeeMapper.toDto(congee);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(congeeDTO));
    }

    /**
     * DELETE  /congees/:id : delete the "id" congee.
     *
     * @param id the id of the congeeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/congees/{id}")
    @Timed
    public ResponseEntity<Void> deleteCongee(@PathVariable Long id) {
        log.debug("REST request to delete Congee : {}", id);
        congeeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
