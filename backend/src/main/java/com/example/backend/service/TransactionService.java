package com.example.backend.service;

import com.example.backend.entity.Transaction;
import com.example.backend.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    // Get all transactions
    public List<Transaction> getAllTransactions() {
        return transactionRepository
                .findAllByOrderByTransactionDateDesc();
    }

    // Add transaction
    public Transaction createTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    // Update transaction
    public Transaction updateTransaction(
            Long id,
            Transaction transaction) {

        Transaction existingTransaction =
                transactionRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Transaction not found"));

        existingTransaction.setType(transaction.getType());
        existingTransaction.setCategory(transaction.getCategory());
        existingTransaction.setAmount(transaction.getAmount());
        existingTransaction.setDescription(
                transaction.getDescription());
        existingTransaction.setTransactionDate(
                transaction.getTransactionDate());

        return transactionRepository.save(existingTransaction);
    }

    // Delete transaction
    public void deleteTransaction(Long id) {

        if (!transactionRepository.existsById(id)) {
            throw new RuntimeException(
                    "Transaction not found");
        }

        transactionRepository.deleteById(id);
    }
}