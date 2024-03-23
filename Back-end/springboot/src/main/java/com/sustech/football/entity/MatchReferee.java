package com.sustech.football.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.github.jeffreyning.mybatisplus.anno.MppMultiId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatchReferee {
    @MppMultiId
    private Long matchId;
    @MppMultiId
    private Long refereeId;
    @TableField(exist = false)
    private Match match;
    @TableField(exist = false)
    private Referee referee;

    public MatchReferee(Long matchId, Long refereeId) {
        this.matchId = matchId;
        this.refereeId = refereeId;
    }
}
