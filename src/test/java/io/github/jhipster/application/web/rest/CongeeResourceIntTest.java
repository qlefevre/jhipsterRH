package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterRhApp;

import io.github.jhipster.application.domain.Congee;
import io.github.jhipster.application.repository.CongeeRepository;
import io.github.jhipster.application.service.dto.CongeeDTO;
import io.github.jhipster.application.service.mapper.CongeeMapper;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CongeeResource REST controller.
 *
 * @see CongeeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterRhApp.class)
public class CongeeResourceIntTest {

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private CongeeRepository congeeRepository;

    @Autowired
    private CongeeMapper congeeMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCongeeMockMvc;

    private Congee congee;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CongeeResource congeeResource = new CongeeResource(congeeRepository, congeeMapper);
        this.restCongeeMockMvc = MockMvcBuilders.standaloneSetup(congeeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Congee createEntity(EntityManager em) {
        Congee congee = new Congee()
            .date(DEFAULT_DATE);
        return congee;
    }

    @Before
    public void initTest() {
        congee = createEntity(em);
    }

    @Test
    @Transactional
    public void createCongee() throws Exception {
        int databaseSizeBeforeCreate = congeeRepository.findAll().size();

        // Create the Congee
        CongeeDTO congeeDTO = congeeMapper.toDto(congee);
        restCongeeMockMvc.perform(post("/api/congees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(congeeDTO)))
            .andExpect(status().isCreated());

        // Validate the Congee in the database
        List<Congee> congeeList = congeeRepository.findAll();
        assertThat(congeeList).hasSize(databaseSizeBeforeCreate + 1);
        Congee testCongee = congeeList.get(congeeList.size() - 1);
        assertThat(testCongee.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createCongeeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = congeeRepository.findAll().size();

        // Create the Congee with an existing ID
        congee.setId(1L);
        CongeeDTO congeeDTO = congeeMapper.toDto(congee);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCongeeMockMvc.perform(post("/api/congees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(congeeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Congee in the database
        List<Congee> congeeList = congeeRepository.findAll();
        assertThat(congeeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCongees() throws Exception {
        // Initialize the database
        congeeRepository.saveAndFlush(congee);

        // Get all the congeeList
        restCongeeMockMvc.perform(get("/api/congees?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(congee.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }

    @Test
    @Transactional
    public void getCongee() throws Exception {
        // Initialize the database
        congeeRepository.saveAndFlush(congee);

        // Get the congee
        restCongeeMockMvc.perform(get("/api/congees/{id}", congee.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(congee.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCongee() throws Exception {
        // Get the congee
        restCongeeMockMvc.perform(get("/api/congees/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCongee() throws Exception {
        // Initialize the database
        congeeRepository.saveAndFlush(congee);
        int databaseSizeBeforeUpdate = congeeRepository.findAll().size();

        // Update the congee
        Congee updatedCongee = congeeRepository.findOne(congee.getId());
        // Disconnect from session so that the updates on updatedCongee are not directly saved in db
        em.detach(updatedCongee);
        updatedCongee
            .date(UPDATED_DATE);
        CongeeDTO congeeDTO = congeeMapper.toDto(updatedCongee);

        restCongeeMockMvc.perform(put("/api/congees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(congeeDTO)))
            .andExpect(status().isOk());

        // Validate the Congee in the database
        List<Congee> congeeList = congeeRepository.findAll();
        assertThat(congeeList).hasSize(databaseSizeBeforeUpdate);
        Congee testCongee = congeeList.get(congeeList.size() - 1);
        assertThat(testCongee.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingCongee() throws Exception {
        int databaseSizeBeforeUpdate = congeeRepository.findAll().size();

        // Create the Congee
        CongeeDTO congeeDTO = congeeMapper.toDto(congee);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCongeeMockMvc.perform(put("/api/congees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(congeeDTO)))
            .andExpect(status().isCreated());

        // Validate the Congee in the database
        List<Congee> congeeList = congeeRepository.findAll();
        assertThat(congeeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCongee() throws Exception {
        // Initialize the database
        congeeRepository.saveAndFlush(congee);
        int databaseSizeBeforeDelete = congeeRepository.findAll().size();

        // Get the congee
        restCongeeMockMvc.perform(delete("/api/congees/{id}", congee.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Congee> congeeList = congeeRepository.findAll();
        assertThat(congeeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Congee.class);
        Congee congee1 = new Congee();
        congee1.setId(1L);
        Congee congee2 = new Congee();
        congee2.setId(congee1.getId());
        assertThat(congee1).isEqualTo(congee2);
        congee2.setId(2L);
        assertThat(congee1).isNotEqualTo(congee2);
        congee1.setId(null);
        assertThat(congee1).isNotEqualTo(congee2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CongeeDTO.class);
        CongeeDTO congeeDTO1 = new CongeeDTO();
        congeeDTO1.setId(1L);
        CongeeDTO congeeDTO2 = new CongeeDTO();
        assertThat(congeeDTO1).isNotEqualTo(congeeDTO2);
        congeeDTO2.setId(congeeDTO1.getId());
        assertThat(congeeDTO1).isEqualTo(congeeDTO2);
        congeeDTO2.setId(2L);
        assertThat(congeeDTO1).isNotEqualTo(congeeDTO2);
        congeeDTO1.setId(null);
        assertThat(congeeDTO1).isNotEqualTo(congeeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(congeeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(congeeMapper.fromId(null)).isNull();
    }
}
