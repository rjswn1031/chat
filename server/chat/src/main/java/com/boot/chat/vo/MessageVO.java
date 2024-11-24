package com.boot.chat.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
public class MessageVO {
    @Getter @Setter
    private String roomId;
    @Getter @Setter
    private String content;
}
