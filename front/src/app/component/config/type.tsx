export interface MemberInfo {
    "mem_id": string,
    "mem_name": string, 
    "mem_tel": string, 
    "mem_email": string
}

export interface ChatRoomInfo {
    "room_id": number,
    "room_notice": string,
    "room_name": string,
    "max_dt": string,
    "no_read_cnt": number,
    "room_member": string,
    "msg_content": string
}

export interface MsgInfo {
    "mem_name": string,
    "msg_content": string,
    "msg_create_dt": string,
    "msg_no": number,
    "msg_send_id": string,
    "msg_state": boolean,
    "room_id": number
}

export interface MsgListInfo {
    date: string,
    time: string,
    name: string,
    msg: string,
    left: boolean
}