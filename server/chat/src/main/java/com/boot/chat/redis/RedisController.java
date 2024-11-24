package com.boot.chat.redis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

import com.boot.chat.vo.MessageVO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@CrossOrigin("*")
@Controller
public class RedisController {
    @Autowired
    private MessagePublisher messagePublisher;
    private final ObjectMapper objectMapper = new ObjectMapper(); // 직접 생성

    //@PostMapping("/send")
    @MessageMapping("/chat") // 클라이언트가 /app/chat으로 보낸 메시지를 받음
    //@SendTo("/topic/chat")   // /topic/chat을 구독 중인 클라이언트에게 메시지를 전송
    public void sendMessage(@RequestBody String message) {
        System.out.println(message);
        messagePublisher.publish(message);
    }

    @MessageMapping("/chat/{roomId}")
    public void sendMessage(@DestinationVariable String roomId, @RequestBody MessageVO message) throws JsonProcessingException {
        String stringMsg = objectMapper.writeValueAsString(message);
        messagePublisher.publish(stringMsg);
    }
}
