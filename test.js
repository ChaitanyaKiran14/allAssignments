var GlideRecordUtility = Class.create();

GlideRecordUtility.prototype = {
    initialize: function() {},

    // Create operation
    createRecord: function(table, data) {
        var gr = new GlideRecord(table);
        gr.initialize();
        for (var field in data) {
            gr.setValue(field, data[field]);
        }
        var newRecordId = gr.insert();
        return newRecordId;
    },

    // Read operation
    getRecord: function(table, sysId) {
        var gr = new GlideRecord(table);
        if (gr.get(sysId)) {
            var record = {};
            gr.getAllFields().forEach(function(field) {
                record[field.getName()] = gr.getValue(field);
            });
            return record;
        }
        return null;
    },

    // Get multiple records operation
    getRecords: function(table, condition) {
        var gr = new GlideRecord(table);
        gr.addEncodedQuery(condition);
        gr.query();
        var records = [];
        while (gr.next()) {
            var record = {};
            gr.getAllFields().forEach(function(field) {
                record[field.getName()] = gr.getValue(field);
            });
            records.push(record);
        }
        return records;
    },

    // Update operation
    updateRecord: function(table, condition, data) {
        var gr = new GlideRecord(table);
        gr.addEncodedQuery(condition);
        gr.query();
        var updated = false;
        while (gr.next()) {
            for (var field in data) {
                gr.setValue(field, data[field]);
            }
            gr.update();
            updated = true;
        }
        return updated;
    },

    // Delete operation
    deleteRecord: function(table, sysId) {
        var gr = new GlideRecord(table);
        if (gr.get(sysId)) {
            gr.deleteRecord();
            return true;
        }
        return false;
    }
};

// Create instance of GlideRecordUtility
var glideRecordUtil = new GlideRecordUtility();

// Example of creating a record
var newIncidentId = glideRecordUtil.createRecord('incident', {'short_description': 'erfergreg', 'assignment_group': 'erferferf'});
gs.info('New Incident Created with Sys ID: ' + newIncidentId);

// Example of reading a record
var kbKnowledgeRecord = glideRecordUtil.getRecord('kb_knowledge', 'wkdfheiofu8e9rfhefvkj');
if (kbKnowledgeRecord) {
    gs.info('Knowledge Base Record Found: ' + JSON.stringify(kbKnowledgeRecord));
} else {
    gs.info('Knowledge Base Record Not Found.');
}

// Example of getting multiple records
var changeRequests = glideRecordUtil.getRecords('change_request', 'active=true^state=2');
gs.info('Found ' + changeRequests.length + ' active change requests in state 2.');

// Example of updating records
var updatedTasks = glideRecordUtil.updateRecord('task', 'active=true', {'short_description': 'erfergreg', 'assignment_group': 'erferferf'});
if (updatedTasks) {
    gs.info('Tasks updated successfully.');
} else {
    gs.info('No tasks updated.');
}

// Example of deleting a record
var deleted = glideRecordUtil.deleteRecord('table_name', 'sys_id');
if (deleted) {
    gs.info('Record deleted successfully.');
} else {
    gs.info('Record not found or could not be deleted.');
}
