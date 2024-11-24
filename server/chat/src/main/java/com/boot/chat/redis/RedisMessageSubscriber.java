package com.boot.chat.redis;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.lang.Nullable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.boot.chat.vo.MessageVO;
import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;;

@Service
public class RedisMessageSubscriber implements MessageListener {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void onMessage(Message message, @Nullable byte[] pattern) {
        String messageContent = new String(message.getBody());
        System.out.println(messageContent);
        System.out.println("===================================");

        MessageVO messageVO;
        try {
            if (message != null && message.getBody() != null) {
                System.out.println(message.getBody());
                messageVO = objectMapper.readValue(message.getBody(), MessageVO.class);
                String roomId = messageVO.getRoomId();
                String content = messageVO.getContent();

                System.out.println(roomId);
                System.out.println(content);
                // 특정 방(topic)에 메시지 전송
                messagingTemplate.convertAndSend("/topic/chat/" + roomId, content);
                //messagingTemplate.convertAndSend("/topic/chat", messageContent);
            } else {
                System.out.println("Received null or empty message.");
            }
        } catch (StreamReadException e) {
            System.out.println("Exception: StreamReadException");
            e.printStackTrace();
        } catch (DatabindException e) {
            System.out.println("Exception: DatabindException");
            e.printStackTrace();
        } catch (IOException e) {
            System.out.println("Exception: IOException");
            e.printStackTrace();
        }
    }
    
}
