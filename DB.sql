CREATE DATABASE chat;

DROP TABLE chat_room_list;
create table chat_room_list (
	room_no int auto_increment primary key,
	create_dt timestamp default now(),
	owner varchar(50) not null,
	guest varchar(50) not null
)


INSERT INTO chat.chat_room_list(owner, guest)
VALUES('leekj', 'parksb');

drop table chat_room_msg;
create table chat_room_msg (
	msg_no int auto_increment primary key,
	room_id int not null,
	msg_create_dt timestamp default now(),
	msg_send_id varchar(50) not null,
	msg_content varchar(4000) not null,
	msg_state boolean default false
)

insert into chat_room_msg ( room_id, msg_send_id, msg_content ) values (1,'leekj', '안녕');
insert into chat_room_msg ( room_id, msg_send_id, msg_content ) values (1,'leekj', '동해물과 백두산이');
insert into chat_room_msg ( room_id, msg_send_id, msg_content ) values (1,'parkbj', '마르고 닳도록 하느님이');
insert into chat_room_msg ( room_id, msg_send_id, msg_content ) values (1,'parkbj', '보우하사 우리나라 만세');
insert into chat_room_msg ( room_id, msg_send_id, msg_content ) values (1,'leekj', '무궁화 삼천리 화려강산');
insert into chat_room_msg ( room_id, msg_send_id, msg_content ) values (1,'parkbj', '대한사람 대한으로');
insert into chat_room_msg ( room_id, msg_send_id, msg_content ) values (1,'leekj', '길이 보전하세');

insert into chat_room_msg ( room_id, msg_send_id, msg_content ) values (2,'leekj', '남산위에 저 소나무');
insert into chat_room_msg ( room_id, msg_send_id, msg_content ) values (2,'parksb', '철갑을 두른 듯');
insert into chat_room_msg ( room_id, msg_send_id, msg_content ) values (2,'leekj', '바람서리 불변함은');
insert into chat_room_msg ( room_id, msg_send_id, msg_content ) values (2,'leekj', '우리 기상일세');
insert into chat_room_msg ( room_id, msg_send_id, msg_content ) values (2,'leekj', '무궁화 삼천리 화려강산');
insert into chat_room_msg ( room_id, msg_send_id, msg_content ) values (2,'parksb', '대한사람 대한으로');
insert into chat_room_msg ( room_id, msg_send_id, msg_content ) values (2,'leekj', '길이 보전하세');



INSERT INTO chat.chat_member
(mem_id, mem_pass, mem_name, mem_tel, mem_email, mem_useyn)
VALUES('leekj', '1234', '이건주', '010-1111-1111', 'kj@chat.com', 1);

INSERT INTO chat.chat_member
(mem_id, mem_pass, mem_name, mem_tel, mem_email, mem_useyn)
VALUES('parkbj', '1234', '박병준', '010-1234-1234', 'bj@chat.com', 1);

INSERT INTO chat.chat_member
(mem_id, mem_pass, mem_name, mem_tel, mem_email, mem_useyn)
VALUES('parksb', '1234', '박상봉', '010-9999-1234', 'sb@chat.com', 1);