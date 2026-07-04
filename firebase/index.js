// Core Crud Application functions for firebase connections 
// using python javascript firebase functionality and express handling

// Firebase Libraries and Modules
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
// V2 Imports: HTTPS and Firestore Triggers
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const Parse = require("parse/node");
const express = require("express");
const cors = require("cors");
// import from flask import Flask, request, jsonify
// import logging python + firebase login
admin.initializeApp(); // Initialize firebase admin for authentication

const db = admin.firestore(); // connect to database in firestore
// db = firestore.client() // pythong db connection
// app = Flask(__name__)
// logging.basicConfig(level=logging.INFO) python logging
// logger = logging.getLogger(__name__)

const app = express(); // create express app
app.use(cors({ origin: true }));

// Crud 

// Create  Express Function example
// app.post("/", async (req, res) => {
//     try {
//         const { id, ...data } = req.body;

//         if (!id) {
//             logger.error("Request failed: Missing ID", { body: req.body });
//             return res.status(400).json({ error: "id is required" });
//         }

//         const newObject = {
//             id: id,                    // Use the provided ID
//             ...data,
//             createdAt: admin.firestore.FieldValue.serverTimestamp(),
//             updatedAt: admin.firestore.FieldValue.serverTimestamp(),
//         };

//         // Create document with the given ID
//         await db.collection("yourCollectionName").doc(id.toString()).set(newObject);

//         logger.info(`Document created successfully: ${id}`);
//         return res.status(201).json({
//             message: "Document created successfully",
//             id: id
//         });

//     } catch (error) {
//         logger.error(`Error creating document ${req.body.id}:`, error);
//         return res.status(500).json({
//             error: "Internal Server Error",
//             message: error.message
//         });
//     }
// });

// python + firebase create function 
// @app.route("/", methods=["POST"])
// def create_document():
//     try:
//         data = request.get_json()

//         if not data or 'id' not in data:
//             logger.error("Request failed: Missing ID", extra={"body": data})
//             return jsonify({"error": "id is required"}), 400

//         doc_id = str(data['id'])
        
//         new_object = {
//             **data,
//             "createdAt": firestore.SERVER_TIMESTAMP,
//             "updatedAt": firestore.SERVER_TIMESTAMP,
//         }

//         # Create document in Firestore
//         db.collection("yourCollectionName").document(doc_id).set(new_object)

//         logger.info(f"Document created successfully: {doc_id}")
//         return jsonify({
//             "message": "Document created successfully",
//             "id": doc_id
//         }), 201

//     except Exception as e:
//         logger.error(f"Error creating document {data.get('id')}: {str(e)}")
//         return jsonify({
//             "error": "Internal Server Error",
//             "message": str(e)
//         }), 500


// if __name__ == "__main__":
//     app.run(debug=True)

// Javascript Firebase Cloud create function
// exports.createObject = onCall({ region: PRIMARY_REGION }, async (request) => {
//     try {
//         const { id, ...data } = request.data;   // request.data is what client sends

//         // Validation
//         if (!id) {
//             logger.error("Create failed: Missing ID", { data: request.data });
//             throw new HttpsError('invalid-argument', 'id is required');
//         }

//         // Prepare the document
//         const newObject = {
//             id: id,
//             ...data,
//             createdAt: new Date(),
//             updatedAt: new Date(),
//         };

//         // Save to Firestore
//         await db.collection("CollectionName")
//                 .doc(id.toString())
//                 .set(newObject);

//         logger.info(`Document created successfully: ${id}`);

//         return {
//             success: true,
//             message: "Document created successfully",
//             id: id
//         };

//     } catch (error) {
//         logger.error("Error creating document:", error);

//         // If it's already an HttpsError, rethrow it
//         if (error instanceof HttpsError) {
//             throw error;
//         }

//         throw new HttpsError(
//             'internal',
//             'Internal Server Error',
//             error.message
//         );
//     }
// });


// Crud Read Function examples

// express + firebase read function

// app.get("/:id", async (req, res) => {// get info based on user id or id of document
//     try {
//         const { id } = req.params;

//         if (!id) {
//             return res.status(400).json({ error: "ID is required" });
//         }

//         const doc = await db.collection("CollectionName").doc(id.toString()).get();

//         if (!doc.exists) {
//             return res.status(404).json({ error: "Document not found" });
//         }

//         return res.status(200).json({
//             success: true,
//             data: {
//                 id: doc.id,
//                 ...doc.data()
//             }
//         });

//     } catch (error) {
//         logger.error("Error fetching document:", error);
//         return res.status(500).json({
//             success: false,
//             error: "Internal Server Error",
//             message: error.message
//         });
//     }
// });

// app.get("/", async (req, res) => {// get all information
//     try {
//         const snapshot = await db.collection("CollectionName").get();

//         const documents = snapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data()
//         }));

//         return res.status(200).json({
//             success: true,
//             count: documents.length,
//             data: documents
//         });

//     } catch (error) {
//         logger.error("Error fetching all documents:", error);
//         return res.status(500).json({
//             success: false,
//             error: "Internal Server Error"
//         });
//     }
// });

// python + firebase read function

// # Get Single Document by ID
// @app.route("/<string:id>", methods=["GET"])
// def get_document(id):
//     try:
//         if not id:
//             return jsonify({"error": "ID is required"}), 400

//         doc_ref = db.collection("yourCollectionName").document(id)
//         doc = doc_ref.get()

//         if not doc.exists:
//             return jsonify({"error": "Document not found"}), 404

//         return jsonify({
//             "success": True,
//             "data": {
//                 "id": doc.id,
//                 **doc.to_dict()
//             }
//         }), 200

//     except Exception as e:
//         logger.error(f"Error fetching document {id}: {str(e)}")
//         return jsonify({"error": "Internal Server Error", "message": str(e)}), 500


// # Get All Documents
// @app.route("/", methods=["GET"])
// def get_all_documents():
//     try:
//         docs = db.collection("yourCollectionName").stream()
        
//         documents = []
//         for doc in docs:
//             documents.append({
//                 "id": doc.id,
//                 **doc.to_dict()
//             })

//         return jsonify({
//             "success": True,
//             "count": len(documents),
//             "data": documents
//         }), 200

//     except Exception as e:
//         logger.error(f"Error fetching all documents: {str(e)}")
//         return jsonify({"error": "Internal Server Error"}), 500

// Firebase Cloud Functions Javascript Read Function

// exports.getObject = onCall({ region: PRIMARY_REGION }, async (request) => {
//     try {
//         const { id } = request.data;

//         if (!id) {
//             throw new HttpsError('invalid-argument', 'id is required');
//         }

//         const doc = await db.collection("yourCollectionName")
//                            .doc(id.toString())
//                            .get();

//         if (!doc.exists) {
//             throw new HttpsError('not-found', 'Document not found');
//         }

//         return {
//             success: true,
//             data: {
//                 id: doc.id,
//                 ...doc.data()
//             }
//         };

//     } catch (error) {
//         logger.error("Error fetching document:", error);

//         if (error instanceof HttpsError) throw error;

//         throw new HttpsError('internal', 'Internal Server Error');
//     }
// });


// // Get All Documents
// exports.getAllObjects = onCall({ region: PRIMARY_REGION }, async (request) => {
//     try {
//         const snapshot = await db.collection("yourCollectionName").get();

//         const documents = snapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data()
//         }));

//         return {
//             success: true,
//             count: documents.length,
//             data: documents
//         };

//     } catch (error) {
//         logger.error("Error fetching all documents:", error);
//         throw new HttpsError('internal', 'Internal Server Error');
//     }
// });

// Express Update Function

// app.put("/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updateData = req.body;

//         if (!id) {
//             return res.status(400).json({ error: "ID is required" });
//         }

//         const docRef = db.collection(COLLECTION).doc(id.toString());

//         const updatePayload = {
//             ...updateData,
//             updatedAt: admin.firestore.FieldValue.serverTimestamp()
//         };

//         await docRef.set(updatePayload, { merge: true }); 

//         return res.status(200).json({
//             success: true,
//             message: "Document updated successfully",
//             id: id
//         });

//     } catch (error) {
//         logger.error("Error updating document:", error);
//         return res.status(500).json({
//             success: false,
//             error: "Internal Server Error",
//             message: error.message
//         });
//     }
// });

// Python Update Function
// @app.route("/<string:id>", methods=["PUT"])
// def update_document(id):
//     try:
//         if not id:
//             return jsonify({"error": "ID is required"}), 400

//         update_data = request.get_json()

//         update_payload = {
//             **update_data,
//             "updatedAt": firestore.SERVER_TIMESTAMP
//         }

//         db.collection(COLLECTION).document(id).set(update_payload, merge=True)

//         return jsonify({
//             "success": True,
//             "message": "Document updated successfully",
//             "id": id
//         }), 200

//     except Exception as e:
//         logger.error(f"Error updating document {id}: {str(e)}")
//         return jsonify({"error": "Internal Server Error", "message": str(e)}), 500

// Firebase Cloud Function Javascript Update Function
// exports.updateObject = onCall({ region: PRIMARY_REGION }, async (request) => {
//     try {
//         const { id, ...updateData } = request.data;

//         if (!id) {
//             throw new HttpsError('invalid-argument', 'id is required');
//         }

//         const updatePayload = {
//             ...updateData,
//             updatedAt: new Date()
//         };

//         await db.collection(COLLECTION)
//                 .doc(id.toString())
//                 .set(updatePayload, { merge: true });

//         logger.info(`Document updated: ${id}`);

//         return {
//             success: true,
//             message: "Document updated successfully",
//             id: id
//         };

//     } catch (error) {
//         logger.error("Error updating document:", error);

//         if (error instanceof HttpsError) throw error;
//         throw new HttpsError('internal', 'Internal Server Error');
//     }
// });

// Crud Delete Function 
// Express Delete Function
// app.delete("/:id", async (req, res) => {
//     try {
//         const { id } = req.params;

//         if (!id) {
//             return res.status(400).json({ error: "ID is required" });
//         }

//         await db.collection(COLLECTION).doc(id.toString()).delete();

//         return res.status(200).json({
//             success: true,
//             message: "Document deleted successfully",
//             id: id
//         });

//     } catch (error) {
//         logger.error("Error deleting document:", error);
//         return res.status(500).json({
//             success: false,
//             error: "Internal Server Error"
//         });
//     }
// });

// Python Delete Function
// @app.route("/<string:id>", methods=["DELETE"])
// def delete_document(id):
//     try:
//         if not id:
//             return jsonify({"error": "ID is required"}), 400

//         db.collection(COLLECTION).document(id).delete()

//         return jsonify({
//             "success": True,
//             "message": "Document deleted successfully",
//             "id": id
//         }), 200

//     except Exception as e:
//         logger.error(f"Error deleting document {id}: {str(e)}")
//         return jsonify({"error": "Internal Server Error"}), 500

// Firebase Cloud Javascript Delete Function

// exports.deleteObject = onCall({ region: PRIMARY_REGION }, async (request) => {
//     try {
//         const { id } = request.data;

//         if (!id) {
//             throw new HttpsError('invalid-argument', 'id is required');
//         }

//         await db.collection(COLLECTION).doc(id.toString()).delete();

//         logger.info(`Document deleted: ${id}`);

//         return {
//             success: true,
//             message: "Document deleted successfully",
//             id: id
//         };

//     } catch (error) {
//         logger.error("Error deleting document:", error);

//         if (error instanceof HttpsError) throw error;
//         throw new HttpsError('internal', 'Internal Server Error');
//     }
// });

// Read Function based on certain query parameters

// Express read query function
// app.get("/", async (req, res) => {
//     try {
//         let query = db.collection("collectionName");
//         let typeofQuery;
//         // Filter by category
//         if (req.query.typeofQuery) {
//             query = query.where("${typeofQuery}", "==", req.query.typeofQuery);
//         }

//         // Filter by status
//         if (req.query.status) {
//             query = query.where("status", "==", req.query.status);
//         }

//         // Filter by upvotes greater than value (optional)
//         if (req.query.minUpvotes) {
//             query = query.where("upvotes", ">=", parseInt(req.query.minUpvotes));
//         }

//         // Sort by upvotes (descending)
//         if (req.query.sort === "upvotes") {
//             query = query.orderBy("upvotes", "desc");
//         }

//         // Limit results
//         const limit = parseInt(req.query.limit) || 50;
//         query = query.limit(limit);

//         const snapshot = await query.get();

//         if (snapshot.empty) {
//             return res.status(200).json([]);
//         }

//         const feedbackList = snapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data()
//         }));

//         return res.status(200).json(feedbackList);

//     } catch (error) {
//         logger.error("Firestore Query Error:", error);
//         return res.status(500).json({
//             error: "Failed to retrieve feedback list",
//             message: error.message
//         });
//     }
// });

// Python read request 

// @app.route("/feedback", methods=["GET"])
// def get_feedback():
//     try:
//         collection_ref = db.collection("productRequests")
//         query = collection_ref

//         # Filter by category
//         if request.args.get("category"):
//             query = query.where("category", "==", request.args.get("category"))

//         # Filter by status
//         if request.args.get("status"):
//             query = query.where("status", "==", request.args.get("status"))

//         # Filter by minimum upvotes
//         if request.args.get("minUpvotes"):
//             query = query.where("upvotes", ">=", int(request.args.get("minUpvotes")))

//         # Sort by upvotes descending
//         if request.args.get("sort") == "upvotes":
//             query = query.order_by("upvotes", direction=firestore.Query.DESCENDING)

//         # Limit results
//         limit = int(request.args.get("limit", 50))
//         query = query.limit(limit)

//         docs = query.stream()

//         feedback_list = []
//         for doc in docs:
//             feedback_list.append({
//                 "id": doc.id,
//                 **doc.to_dict()
//             })

//         return jsonify(feedback_list), 200

//     except Exception as e:
//         logger.error(f"Firestore Query Error: {str(e)}")
//         return jsonify({
//             "error": "Failed to retrieve feedback list",
//             "message": str(e)
//         }), 500

// exports.queryFeedback = onCall({ region: PRIMARY_REGION }, async (request) => {
//     try {
//         const { 
//             category, 
//             status, 
//             minUpvotes, 
//             sort, 
//             limit = 50 
//         } = request.data;   // Client sends data as object

//         let query = db.collection("productRequests");

//         // Filters
//         if (category) {
//             query = query.where("category", "==", category);
//         }

//         if (status) {
//             query = query.where("status", "==", status);
//         }

//         if (minUpvotes !== undefined) {
//             query = query.where("upvotes", ">=", parseInt(minUpvotes));
//         }

//         // Sorting
//         if (sort === "upvotes") {
//             query = query.orderBy("upvotes", "desc");
//         }

//         // Limit
//         query = query.limit(parseInt(limit));

//         const snapshot = await query.get();

//         if (snapshot.empty) {
//             return [];
//         }

//         const feedbackList = snapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data()
//         }));

//         return feedbackList;

//     } catch (error) {
//         logger.error("Firestore Query Error:", error);

//         if (error instanceof HttpsError) throw error;
//         throw new HttpsError('internal', 'Failed to retrieve feedback list');
//     }
// });