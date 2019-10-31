const STATUS = ['critical', 'error', 'warning', 'ok'];

var sent_alerts = [];

const SCENARIOS = {
  scenario1: {
    "alert_group_key": "alert-group-key11",
    "message": "Email-service in warning severity",
    "description": "Email-Service CPU utilization breached threshold limit of 60%",
    "hostname": "Email-server",
    "ip_address": "106.136.31.23",
    "resource": "CPU Utilization",
    "mo_name": "My Managed Object",
    "status": "warning",
    "occured_at": "2019-10-25T10:10:42Z",
    "value": "60%",
    "additional_info": {}
  },
  scenario2: {
    "alert_group_key": "alert-group-key11",
    "message": "Email-service in error severity",
    "description": "Email-Service CPU utilization breached threshold limit of 70%",
    "hostname": "Email-server",
    "ip_address": "106.136.31.23",
    "resource": "CPU Utilization",
    "mo_name": "My Managed Object",
    "status": "error",
    "occured_at": "2019-10-25T10:10:42Z",
    "value": "70%",
    "additional_info": {}
  },
  scenario3: {
    "alert_group_key": "alert-group-key11",
    "message": "Email-service in critical severity",
    "description": "Email-Service CPU utilization breached threshold limit of 90%",
    "hostname": "Email-server",
    "ip_address": "106.136.31.23",
    "resource": "CPU Utilization",
    "mo_name": "My Managed Object",
    "status": "critical",
    "occured_at": "2019-10-25T10:11:42Z",
    "value": "90%",
    "additional_info": {}
  },
  scenario4: {
    "alert_group_key": "alert-group-key11",
    "message": "DB-server in warning severity",
    "description": "DB-Server has reached 60% disc utilization",
    "hostname": "DB-server",
    "ip_address": "106.136.31.86",
    "resource": "Disc space",
    "mo_name": "My Managed Object",
    "status": "warning",
    "occured_at": "2019-10-25T10:13:42Z",
    "value": "60%",
    "additional_info": {}
  },
  scenario5: {
    "alert_group_key": "alert-group-key11",
    "message": "DB-server in error severity",
    "description": "DB-Server has reached 70% disc utilization",
    "hostname": "DB-server",
    "ip_address": "106.136.31.86",
    "resource": "Disc space",
    "mo_name": "My Managed Object",
    "status": "error",
    "occured_at": "2019-10-25T10:14:42Z",
    "value": "70%",
    "additional_info": {}
  },
  scenario6: {
    "alert_group_key": "alert-group-key11",
    "message": "DB-server is ok",
    "description": "DB-Server has reached 30% disc utilization",
    "hostname": "DB-server",
    "ip_address": "106.136.31.86",
    "resource": "Disc space",
    "mo_name": "My Managed Object",
    "status": "ok",
    "occured_at": "2019-10-25T10:12:42Z",
    "value": "30%",
    "additional_info": {}
  },
  scenario7: {
    "alert_group_key": "alert-group-key11",
    "message": "Email-service is ok",
    "description": "Email-Service CPU utilization is under threshold limit",
    "hostname": "Email-server",
    "ip_address": "106.136.31.23",
    "resource": "CPU Utilization",
    "mo_name": "My Managed Object",
    "status": "ok",
    "occured_at": "2019-10-25T10:12:42Z",
    "value": "40%",
    "additional_info": {}
  }
}