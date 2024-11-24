package com.boot.chat.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChatVO {
	private Integer room_id;
	private String mem_id;
	private String msg_content;
}
