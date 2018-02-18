package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.CongeeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Congee and its DTO CongeeDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CongeeMapper extends EntityMapper<CongeeDTO, Congee> {



    default Congee fromId(Long id) {
        if (id == null) {
            return null;
        }
        Congee congee = new Congee();
        congee.setId(id);
        return congee;
    }
}
